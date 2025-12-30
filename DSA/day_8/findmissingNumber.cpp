// link - https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1?utm_medium=article_practice_tab&utm_campaign=article_practice_tab&utm_source=geeksforgeeks#approach-3-using-xor-operation-on-time-and-o1-space

/*
class Solution {
  public:
    int missingNum(vector<int>& arr) {
        int size = arr.size();
        int ans = 0;
        for(int i=0; i<size;i++){
            ans = ans^arr[i];
        }
        int x=0;
        for(int j=1;j<=size+1;j++){
            x = x^j;
        }
        
        return x^ans;
        
    }
};*/