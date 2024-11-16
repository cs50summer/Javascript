/*
Harold is a kidnapper who wrote a ransom note, but now he is worried it will be traced back to him through his handwriting. He found a magazine and wants to know if he can cut out whole words from it and use them to create an untraceable replica of his ransom note. The words in his note are case-sensitive and he must use only whole words available in the magazine. He cannot use substrings or concatenation to create the words he needs.

Given the words in the magazine and the words in the ransom note, print Yes if he can replicate his ransom note exactly using whole words from the magazine; otherwise, print No.

Example
 = "attack at dawn"  = "Attack at dawn"

The magazine has all the right words, but there is a case mismatch. The answer is .

Function Description

Complete the checkMagazine function in the editor below. It must print  if the note can be formed using the magazine, or .

checkMagazine has the following parameters:

string magazine[m]: the words in the magazine
string note[n]: the words in the ransom note
Prints

string: either  or , no return value is expected
Input Format

The first line contains two space-separated integers,  and , the numbers of words in the  and the , respectively.
The second line contains  space-separated strings, each .
The third line contains  space-separated strings, each .


'''
# store the array in a dcitionary 

def exp(magazine, note):
    mdict=dict()
    ndict=dict()

    for i in magazine:
        if  mdict.get(i)==None:
            mdict[i]=1
        else:
            mdict[i]+=1
    for i in note:
        if ndict.get(i)==None:
            ndict[i]=1
        else:
            ndict[i]+=1

    if mdict==ndict:
        return True 
    else:
        return False


print(exp("this is a note","this is note"))
*/

function checkMagazine(magazine, note) {
    // Write your code here
    
   let  mdict=new Map()
   let  ndict=new Map()
   console.log(magazine)
   console.log(note)

    for (var i=0 ; i < (magazine.length) ;i++ ){
        console.log(magazine[i])
        let x=magazine[i]
        if  (mdict.get(x)==null){
            mdict.set(x ,1)
        }
        else{
            mdict.i+=1
        }
    }
    for (let i in note){
        if (ndict.i==null){
            ndict.i=1
        }
        else{
            ndict.i+=1
        }
    }
    console.log(mdict)
    for (let i=0; i< note.length; i++){
        if (ndict.i){
            console.log(ndict)
        }
    }
    if (mdict==ndict){
        return True 
    }
    else{
        return false
    }
    

}