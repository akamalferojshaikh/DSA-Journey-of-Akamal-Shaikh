#include <iostream>
using namespace std;

int main()
{
    //     *
    //    ***
    //   *****
    //  *******
    // *********
    //  *******
    //   *****
    //    ***
    //     *

    // int n = 5;
    // for(int i=1;i<=n;i++){
    //     for(int L=5; L>i; L--){
    //         cout<< " ";
    //     }
    //     //star prinitng
    //     for(int S=1; S<=(2*i-1);S++){
    //         cout<<"*";
    //     }
    //     cout<<endl;
    // }

    // for(int k=4; k>=1; k--){
    //     for(int space = 5; space>k ; space--){
    //         cout<< " ";
    //     }
    //     for(int star = 1; star<=(2*k-1) ; star++){
    //         cout<< "*";
    //     }
    //     cout<<endl;

    // }

    // pattern making logic
    //  for(int L=1; L<3; L++){
    //      cout<< " ";
    //  }
    //  for(int S=1; S<=7;S++){
    //      cout<<"*";
    //  }
    //  cout<<endl;
    //  for(int L=1; L<4; L++){
    //          cout<< " ";
    //  }
    //  for(int S=1; S<=5;S++){
    //          cout<<"*";
    //  }
    //  cout<<endl;
    //  for(int L=1; L<5; L++){
    //          cout<< " ";
    //  }
    //  for(int S=1; S<=3;S++){
    //          cout<<"*";
    //  }

    //      1
    //     121
    //    12321
    //   1234321
    //  123454321

    for(int i=1; i<=5; i++){
        for(int space = 4; space>=i; space--){
            cout<<" ";
        }
        for(int incr=1;incr<=i;incr++){
            cout<<incr;
        }
        for(int decr=i-1; decr>=1; decr--){
            cout<<decr;
        }
        cout<<endl;
    }

    // for(int i=4;i>=1;i--){
    //     cout<<" ";
    // }

    // for(int j=1;j<=1;j++){
    //     cout<<"1";
    // }
    // cout<<endl;
    // for(int i=3;i>=1;i--){
    //     cout<<" ";
    // }

    // for(int j=1;j<=2;j++){
    //     cout<<j;
    // }
    // for(int k=1; k<=1; k++){
    //     cout<<"1";
    // }
    // cout<<endl;

    // for(int i=2;i>=1;i--){
    //     cout<<" ";
    // }

    // for(int j=1;j<=3;j++){
    //     cout<<j;
    // }
    // for(int k=2; k>=1; k--){
    //     cout<<k;
    // }
    // cout<<endl;
    

    return 0;
}