import numpy as np
import pandas as pd
from pandas import DataFrame

def read_txt(filename, sep="]]") :
    str = ""
    file = open(filename,'r',encoding='UTF8')
    
    str = file.readlines()
    
    for i in range(0, len(str)) :
        str[i] = str[i].replace(']',']]',2).strip().split(sep)
    return (str[3:])

    file.close()

def txt_to_csv(df):
    df['Message'] = df['Message'].fillna(df['User'])
    df['User'] = np.where(df['Date'].isnull()==True, 
                                       None,
                                       df['User'])
    df['Date'] = df['Date'].fillna(method='ffill')
    df['User'] = df['User'].fillna(method='ffill')
    df['User'] = df['User'].str[1:]
    df['Date'] = df['Date'].str[2:]

    df["tf"] = None
    for i in range(len(df)):
        if "--------------- " in df.iloc[i,2]:
            df.iloc[i,3] = df.iloc[i,2].split("---------------")[1]
        else:
            pass
    df["tf"] = df["tf"].fillna(method="ffill")

    index = []
    for j in range(len(df)):
        if "--------------- " not in df.iloc[j,2]:
            index.append(j)
        else:
            pass
    df = df.iloc[index,:]
    df = df.reset_index()
    df.drop("index",axis=1,inplace=True)
    df["Date"] = df["tf"] + df["Date"] 
    df.drop("tf",axis=1,inplace=True)
    df = df.iloc[1:,:]
    df = df.reset_index()
    df.drop("index",axis=1,inplace=True)
    for i in range(len(df)):
        lst = df["Date"][i].strip().split(" ")
        year = lst[0][:-1]
        month = lst[1][:-1]
        day = lst[2][:-1]
        time = lst[5]
        date = ""
        if int(month) < 10:
            if int(day) < 10:
                date = year+"-"+"0"+month+"-"+"0"+day+" "+time
            elif int(day) > 10:
                date = year+"-"+"0"+month+"-"+day+" "+time
        elif int(month) > 10:
            if int(day) < 10:
                date = year+"-"+month+"-"+"0"+day+" "+time
            else:
                date = year+"-"+month+"-"+day+" "+time

        df["Date"][i] = date
    df = df[["Date","User","Message"]]
    return df

def data_cleansing_date(df):
    # 문자열 형태로 되어 있는 날짜 데이터를 datetime 형태로 변환시켜준다.
    df["Date"] = pd.to_datetime(df["Date"],format= "%Y-%m-%d %H:%M:%S")
    weekday = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
    df["Year"] = df["Date"].apply(lambda x : x.year)
    df["Month"] =  df["Date"].apply(lambda x : x.month)
    df["Day"] =  df["Date"].apply(lambda x : x.day)
    df["Weekday"] =  df["Date"].apply(lambda x : weekday[x.weekday()])
    df["24time"] = df["Date"].apply(lambda x : x.time())
    df["timetype"] = df["Date"].apply(lambda x : "오후" if x.hour >= 12 else "오전")
    df["len"] = df["Message"].apply(lambda x : len(x))
    df["hour"] = df["24time"].apply(lambda x : x.hour)
    df["minute"] = df["24time"].apply(lambda x : x.minute)
    df = df[['Date', 'Year', 'Month', 'Day', 'Weekday', '24time','hour','minute','timetype', 'len', 'User', 'Message']]
    return df

def extract_period(df):
    start = df.iloc[0]['Date']
    end = df.iloc[-1]['Date']
    print("Start :", start)
    print("End :", end)
    return start, end

def main() :
    df = DataFrame((read_txt('timetest.txt')), columns=['User','Date','Message'])
    df = txt_to_csv(df)
    df = data_cleansing_date(df)
    start, end = extract_period(df)

if __name__ == '__main__' :
    main()