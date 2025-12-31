// Link - https://strikes.in/practice/68aedbbf98d05a5eb2de2d4c

//Solution 1

/*
int sumOfUnique(vector<int>& nums) {
    // Your code here
	int n = nums.size();
	int sum = 0;

	for(int i =0; i<n;i++){
		bool found = false;
		for(int j=0; j<n;j++){
			if(i==j){
				continue;
			}
			else if(nums[i] == nums[j]){
				found = true;
				break;
			}
		}
		if(found == false){
			sum+=nums[i];
		}
	}
	return sum;
	
}
*/

// Solution 2
/*
int sumOfUnique(vector<int>& nums) {
    // Your code here
	int n = nums.size();
	vector<int>freq(101,0);

	for(int i=0;i<n;i++){
		freq[nums[i]]++;
	}

	int sum = 0;
	for(int j = 1;j<=100;j++){
		if(freq[j]==1){
			sum+=j;
		}
	}

	return sum;
}
*/