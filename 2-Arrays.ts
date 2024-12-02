const nums: number[] = [];

// write //
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;

nums.push(4);
nums.push(5);

nums.unshift(0);
nums.unshift(-1);

console.log(nums);

// delete //
nums.splice(4, 1);
console.log(nums);
