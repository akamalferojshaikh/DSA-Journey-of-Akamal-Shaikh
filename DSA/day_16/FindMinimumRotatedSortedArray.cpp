/*

https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

class Solution {
public:
    int findMin(vector<int>& nums) {
        int n = nums.size();
        int left =0,right =n-1;

        if(nums[0]<=nums[n-1]){
            return nums[0];
        }
        int minElem;

        while(left<=right){
            int mid = left+(right-left)/2;
            if(nums[mid]>=nums[0]){
                left = mid+1;
            }
            else{
                right = mid-1;
                minElem = nums[mid];
            }
        }
        return minElem;
    }
};


*/