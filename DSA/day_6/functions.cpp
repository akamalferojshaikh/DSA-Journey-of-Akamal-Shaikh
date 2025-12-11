#include<iostream>
using namespace std;

void primenumberchecker(int num){
    int counter = 0;
    for(int i=1; i<=num; i++){
        if(num%i == 0){
            counter++;
    }

    }
    if(counter>2){
        cout<<"number is not prime";
    }
    else{
        cout<<"number is prime";
    }
}

int main(){
    
    // functions ke saath khlete hai😎
    int num;
    cout<<"enter number to chk if prime: ";
    cin>>num;
    
    primenumberchecker(num);

    
    return 0;
}