#include<iostream>
using namespace std;
int main(){
    // *
    // **
    // ***
    // ****
    // *****
    // for(int i=1;i<=5;i++){
    //     for (int j=1;j<=i;j++){
    //         cout<<"*";

    //     }
    //     cout<<endl;
    // }
    // for(int i=5;i>=1;i--){
    //     for (int j=1;j<=i;j++){
    //         cout<<"*";

    //     }
    //     cout<<endl;
    // }
    
    //      *
    //     **
    //    ***
    //   ****
    //  *****    

    for(int i=1;i<=5;i++){
        for(int space = 5;space>i;space--){
            cout<< " ";
        }
        for(int st=i;st>=1;st--){
            cout<<"*";
        }
        cout<<endl;
    }

   
    // 1 2 3 4 5
    // 6 7 8 9 10
    // 11 12 13 14 15
    // 16 17 18 19 20
    // 21 22 23 24 25

    // int num =1;
    // for(int i=1;i<=21;i+=5){
    //     for(int j=i;j<=i+4;j++){
    //         cout<<j <<" ";
    //         // num++;
    //     }
    //     cout<<endl;
    //}
    



    return 0;
}

