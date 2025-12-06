#include <iostream>
using namespace std;
int main()
{
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

    // for(int i=1;i<=5;i++){
    //     for(int space = 5;space>i;space--){
    //         cout<<"*";
    //     }
    //     for(int st=i;st>=1;st--){
    //         cout<< " ";
    //     }
    //     cout<<endl;
    // }

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

    //     *
    //    ***
    //   *****
    //  *******
    // *********

    for(int i=5; i>=1; i--){ //this loop is for 5 lines
        //left wali space print karne
        for(int L=5; L>=i; L--){
            cout<< " ";
        }
        //star prinitng
        for(int S=1; S<=(2*i-1);S++){
            cout<<"*";
        }
        //right wali space print karne
        for(int R=5; R>=i; R--){
            cout<< " ";
        }
        cout<<endl;
    }
    


    // for (int space = 1; space <= 4; space++)
    // {   cout << "-";     }
    // for (int star = 1; star <= 1; star++)
    // {   cout << "*";    }
    // for (int space1 = 1; space1 <= 4; space1++)
    // {   cout << "-";    }
    // cout<<endl;
    // for (int space = 1; space <= 3; space++)
    // {   cout << "-";    }
    // for (int star = 1; star <= 3; star++)
    // {   cout << "*";    }
    // for (int space1 = 1; space1 <= 3; space1++)
    // {   cout << "-";    }
    // cout<<endl;














    // for(int i=1; i<=5; i++){
    //     //space wala loop
    //     // for(int space=4; space>=i;space--){
    //     //     cout<< " ";
    //     // }
        
    //     // for(int star=1; star<=25;star++){
    //     //     cout<< "*";
    //     // }
        
    //     // for(int space=4; space>=i;space--){
    //     //     cout<< " ";
    //     // }cout<< "*";
    //     // cout<<endl;
    // }

    return 0;
}
