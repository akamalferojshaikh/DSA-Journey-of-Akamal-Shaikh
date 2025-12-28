#include<iostream>
using namespace std;

// void swaparr(int arr[],int len){
//     for(int i=0; i<len/2;i++){
//        int temp = arr[i];
//        arr[i] = arr[len-i-1];
//        arr[len-i-1] = temp;
//     }
    
// }
int main(){
    // cout<<"HI today i am stdying array";
    // int arr[5] = {1,2,3,4,5};
    // int len=5;
    // for(int j=0;j<len;j++){
    //     cout<<arr[j];
    // }
    // cout<<endl;
    // swaparr(arr,len);
    // for(int j=0;j<len;j++){
    //     cout<<arr[j];
    // }

    // Q - Find min element in an array
    // int arr[7] = {1,7,2,3,4,5,10};
    // int min = arr[0];
    // for(int i=1;i<7;i++){
    //     if(min>arr[i]){
    //         min = arr[i];
    //     }
    // }
    // cout<<min;
    // Q - Find max element in an array
    int arr[7] = {1,7,2,3,4,5,10};
    int max = arr[0];
    for(int i=1;i<7;i++){
        if(max<arr[i]){
            max = arr[i];
        }
    }
    cout<<max;
    return 0;
}