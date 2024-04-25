// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exam {
    address public teacher;
    uint public totalMarks;
    uint public passingMarks;
    mapping(address => uint) public marks;

    constructor(uint _totalMarks, uint _passingMarks) {
        teacher = msg.sender;
        totalMarks = _totalMarks;
        passingMarks = _passingMarks;
    }

    function submitMarks(address student, uint studentMarks) external {
        require(msg.sender == teacher, "Only teacher can submit marks");
        require(studentMarks <= totalMarks, "Marks cannot be greater than total marks");
        marks[student] = studentMarks;
    }

    function getMarks(address student) external view returns (uint) {
        return marks[student];
    }

    function isPass(address student) external view returns (bool) {
        return marks[student] >= passingMarks;
    }
}