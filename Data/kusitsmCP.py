import numpy as np
import pandas as pd
from pandas import DataFrame
import re
import datetime as dt

import re
import pandas as pd
import datetime as dt

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
    print("Start :", start)
    print("End :", end)
    return start, end

def participant_show(df):
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    print(df['User'])
    return df['User']

def chat_counts(df) :
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    for i in range (len(df)) :
        print ('User Name :',df.iloc[i]['User'], ', Chat counts :',
               df.iloc[i]['Chat_counts'])

def count_send_question(df):
    df = df[df['Message'].str.contains('\?')]
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'count_send_question']
    for i in range (len(df)) :
        print ('User Name :',df.iloc[i]['User'], ', Question send counts :',
               df.iloc[i]['count_send_question'])

def count_send_file(df):
    df = df[df['Message'].str.contains('파일')]
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'count_send_file']
    for i in range (len(df)) :
        print ('User :',df.iloc[i]['User'], ', File send counts :',
               df.iloc[i]['count_send_file'])

def count_send_picture(df):
    df = df[df['Message'].str.contains('사진')]
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'count_send_picture']
    for i in range (len(df)) :
        print ('User Name :',df.iloc[i]['User'], ', Picture send counts :',
               df.iloc[i]['count_send_picture'])

def num_of_user(df) :
    df = df['User'].value_counts(dropna=True, sort=True)
    df = pd.DataFrame(df)
    df = df.reset_index()
    df.columns = ['User', 'Chat_counts']
    print('채팅방의 참가자 수 :', len(df))

def mean_of_message(df) :
    print(df.groupby(['User'])['length'].mean())

def time_chat_counts(df) :
    df['24time_H']= df['24time'].astype(str)
    df['24time_H']=df['24time_H'].str[:2]
    print(df['24time_H'].value_counts())

if __name__ == '__main__':
    msg_list = read_kko_msg("kakao.txt")
    apply_kko_regex(msg_list)
    df = pd.read_csv("kko_regex.csv")

    df.Date = pd.to_datetime(df.Date)
    
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
    
    print('==========kakaotalk 시작, 종료 날짜==========')
    extract_period(df)
    print('==========채팅방의 참여자 수==========')
    num_of_user(df)
    print('==========참여자 목록==========')
    participant_show(df)
    print('==========참여자별 채팅 횟수==========')
    chat_counts(df)
    print('==========참여자별 파일 전송 횟수==========')
    count_send_file(df)
    print('==========참여자별 질문 전송 횟수==========')
    count_send_question(df)
    print('==========참여자별 사진 전송 횟수==========')
    count_send_picture(df)
    print('==========참여자별 채팅 평균 길이==========')
    mean_of_message(df)
    print('==========시간대별 채팅 빈도수==========')
    time_chat_counts(df)