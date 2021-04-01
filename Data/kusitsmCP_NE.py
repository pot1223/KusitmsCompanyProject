# -*- coding: euc-kr -*-
#import numpy as np
import pandas as pd
#from pandas import DataFrame
import re
import datetime as dt
import json
from numpyencoder import NumpyEncoder
#import glob
#from sklearn.preprocessing import StandardScaler
#from scipy.stats import norm

#맨 위의 첫줄과 아래 4줄은 VSCODE 인코딩 문제때문에 추가한거라 신경안쓰셔도됩니다!
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def read_kko_msg(filename):
    with open(filename, encoding='utf-8') as f:
        msg_list = f.readlines()
    return msg_list

def apply_kko_regex(msg_list):
    kko_pattern = re.compile("\[([\S\s]+)\] \[(오전|오후) ([0-9:\s]+)\] ([^\n]+)")
    kko_date_pattern = re.compile("--------------- ([0-9]+년 [0-9]+월 [0-9]+일) ")

    emoji_pattern = re.compile("["u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               "]+", flags=re.UNICODE)

    kko_parse_result = list()
    cur_date = ""

    for msg in msg_list:
        # 날짜 부분인 경우
        if len(kko_date_pattern.findall(msg)) > 0:
            cur_date = dt.datetime.strptime(kko_date_pattern.findall(msg)[0], "%Y년 %m월 %d일")
            cur_date = cur_date.strftime("%Y-%m-%d")
        else:
            kko_pattern_result = kko_pattern.findall(msg)
            if len(kko_pattern_result) > 0:
                tokens = list(kko_pattern_result[0])
                # 이모지 데이터 삭제
                tokens[-1] = re.sub(emoji_pattern, "", tokens[-1])
                tokens.insert(0, cur_date)
                kko_parse_result.append(tokens)

    kko_parse_result = pd.DataFrame(kko_parse_result, columns=["Date", "User", "Timetype", "Time", "Message"])
    kko_parse_result.to_csv("kko_regex.csv", index=False)

    return kko_parse_result

def extract_period(df) :
    start = df.iloc[0]['Date']
    end = df.iloc[-1]['Date']
    #print("Start :", start) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    #print("End :", end) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    start = start.strftime('%Y-%m-%d')
    end = end.strftime('%Y-%m-%d')
    date_data = {
        "start": start,
        "end": end
    }
    #print(start, end) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    #return start, end
    return date_data
    # with open('extract_period_func.json', 'w', encoding='utf-8') as file:
    #     return json.dump(date_data, file)

def all_chat_count(df) :
    print(len(df))
    return len(df)

def participant_show(df):
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    #print(df['User']) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    df_f=df['User']
    #print(df_f) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    return df_f.values
    # with open('participant_show_func.json', 'w', encoding='utf-8') as file:
    #     return df_f.to_json(file, force_ascii=False)

def chat_counts(df) :
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    df_f=df
    #print(df_f) #TODO: print하는 항목들이 전부 서버로 return되는 구조라 우선 print는 필요한 항목들만 남겨두었습니다!
    return df_f.values
    # with open('chat_counts_func.json', 'w', encoding='utf-8') as file:
    #     return df_f.to_json(file, force_ascii=False)

def chat_counts_percentage(df) :
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    df['Chat_counts']=df['Chat_counts']/sum(df['Chat_counts'])*100
    df_f = df
    return df_f.values

def count_send_question(df):
    df = df[df['Message'].str.contains('\?')]
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'count_send_question']
    df_f=df
    #print(df_f)
    return df_f.values
    # with open('count_send_question_func.json', 'w', encoding='utf-8') as file:
    #     return df_f.to_json(file, force_ascii=False)

def activity_show(df):
    def count_send_picture(df):
        df = df[df['Message'].str.contains('사진')]
        df = df['User'].value_counts(dropna=True, sort=True)
        df = pd.DataFrame(df)
        df = df.reset_index()
        df.columns = ['User', 'Activity']
        df_pic = df
        return df_pic

    def count_send_file(df):
        df = df[df['Message'].str.contains('파일')]
        df = df['User'].value_counts(dropna=True, sort=True)
        df = pd.DataFrame(df)
        df = df.reset_index()
        df.columns = ['User', 'Activity']
        df_file = df
        return df_file
    df_f = pd.concat([count_send_file(df), count_send_picture(df)]).groupby(['User']).sum().reset_index()
    return df_f.values

def num_of_user(df) :
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    num_of_user = len(df)
    #print(num_of_user)
    return num_of_user
    # num_of_user_data = {
    #     "num_of_user": num_of_user
    # }
    # with open('num_of_user_func.json', 'w', encoding='utf-8') as file:
    #     return json.dump(num_of_user_data, file)

def mean_of_message_len(df) :
    df_f=df.groupby(['User'])['len'].mean()
    #print(df_f)
    return df_f
    # with open('mean_of_message_len_func.json', 'w', encoding='utf-8') as file:
    #     return df_f.to_json(file, force_ascii=False)

if __name__ == '__main__':
    msg_list = read_kko_msg("kakao.txt")
    apply_kko_regex(msg_list)
    df = pd.read_csv("kko_regex.csv")

    df.Date = pd.to_datetime(df.Date)
    
    df["hour"] = df["Date"].apply(lambda x : x.hour)
    df["minute"] = df["Date"].apply(lambda x : x.minute)
    df["year"] = df['Date'].dt.strftime('%Y')
    df["month"] = df['Date'].dt.strftime('%m')
    df["day"] = df['Date'].dt.strftime('%d')
    df["weekday"] = df['Date'].dt.day_name()

    ## 24시간제 표기
    df["24time"] = df["Timetype"] + " " + df["Time"]
    df["24time"] = df["24time"].map(lambda x : x.replace("오전","AM"))
    df["24time"] = df["24time"].map(lambda x : x.replace("오후","PM"))

    temp = []
    transform_time = []
    for i in range(len(df)) :
        time = df["24time"][i]
        temp.append(dt.datetime.strptime(time,"%p %I:%M"))
        transform_time.append(temp[i].time())

    df["24time"] = transform_time

    ## 글자 수
    title_len = []

    for i in range(len(df)):
        ttl = len(df['Message'][i])
        title_len.append(ttl)

    df['length'] = title_len
    df.head()

    ## 계절 설정
    quarter = []
    for i in range(len(df)) :
        a = int(df["month"][i])
        if a >= 1 and a <= 3 :
            quarter.append("1q")
        if a >= 4 and a <= 6 :
            quarter.append("2q")
        if a >= 7 and a <= 9 :
            quarter.append("3q")
        if a >= 10 and a <= 12 :
            quarter.append("4q")

    df["quarter"] = quarter

    all_chat_count(df)
    #print('==========kakaotalk 시작, 종료 날짜==========')
    date_data = {}
    date_data = extract_period(df) #TODO: return값 받아서 저장
    #print('==========채팅방의 참여자 수==========')
    participant_num = 0
    participant_num = num_of_user(df) #TODO: return값 받아서 저장
    #print('==========참여자 목록==========')
    participant_list = {}
    participant_list = participant_show(df) #TODO: return값 받아서 저장
    #print(json.dumps(participant_list))
    #print('==========참여자별 채팅 횟수==========')
    participant_chat = {}
    participant_chat = chat_counts(df) #TODO: return값 받아서 저장
    #print('==========참여자별 적극성 수치==========')
    participant_activity = {}
    participant_activity = activity_show(df) #TODO: return값 받아서 저장
    #print('==========참여자별 질문 전송 횟수==========')
    participant_question = {}
    participant_question = count_send_question(df) #TODO: return값 받아서 저장

    #print('==========참여자별 채팅 비율==========')
    chat_counts_percentage = {}
    chat_counts_percentage = chat_counts_percentage(df)

    #TODO: 출력결과 한번에 주기위해 analyze_result 구조체 형성
    analyze_result = {}
    analyze_result = {
        'date_data': date_data,
        'participant_num': participant_num,
        'participant_list': participant_list,
        'participant_chat' :participant_chat,
        'participant_question' : participant_question,
        'participant_activity' : participant_activity,
        'chat_counts_percentage' : chat_counts_percentage
    }

    #TODO: json.dumps로 출력결과 json형태로 return, ensure_ascii=False옵션은 한글 인코딩관련 옵션, cls=NumpyEncoder는 ndarray를 json화 하기위한 옵션
    print(json.dumps(analyze_result, ensure_ascii=False, cls=NumpyEncoder))