// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Agreement {
    uint public no_of_jobs = 0;
    uint public no_of_jobAgreements = 0;
    uint public no_of_users = 0;

    struct Job {
        uint jobId;
        uint userId;
        uint agreementId;
        string jobTitle;
        string companyName;
        uint workHourPerWeek;
        uint contractDuration;
        uint salaryPerHour;
        bool statusOpen;
        uint timestamp;
        address employer;
        address currentUser;
    }

    mapping(uint => Job) public Job_by_No;

    struct JobAgreement {
        uint agreementId;
        uint jobId;
        uint userId;
        string jobTitle;
        string companyName;
        string userName;
        uint workHourPerWeek;
        uint contractDuration;
        uint salaryPerHour;
        uint timestamp;
        address signedEmployer;
        address signedUser;
    }

    mapping(uint => JobAgreement) public JobAgreement_by_No;

    struct User {
        uint userId;
        uint agreementId;
        uint jobId;
        string userName;
        uint timestamp;
        address currentEmployer;
        address user;
    }

    mapping(uint => User) public User_by_No;

    modifier onlyEmployer(uint _index) {
        require(
            msg.sender == Job_by_No[_index].employer,
            "Only Employer can access this"
        );
        _;
    }

    modifier onlyUser(uint _index) {
        require(
            msg.sender != Job_by_No[_index].employer,
            "Only User can access this"
        );
        _;
    }

    modifier OnlyWhileStatusOpen(uint _index) {
        require(
            Job_by_No[_index].statusOpen == true,
            "Job is currently Closed."
        );
        _;
    }

    modifier AgreementTimesUp(uint _index) {
        uint _AgreementNo = Job_by_No[_index].agreementId;
        uint time = JobAgreement_by_No[_AgreementNo].timestamp +
            JobAgreement_by_No[_AgreementNo].contractDuration;
        require(block.timestamp < time, "Agreement already Ended");
        _;
    }

    modifier AgreementTimesLeft(uint _index) {
        uint _AgreementNo = Job_by_No[_index].agreementId;
        uint time = JobAgreement_by_No[_AgreementNo].timestamp +
            JobAgreement_by_No[_AgreementNo].contractDuration;
        require(block.timestamp > time, "Time is left for contract to end");
        _;
    }

    function addJob(
        string memory _jobTitle,
        string memory _companyName,
        uint _workHourPerWeek,
        uint _salaryPerHour
    ) public {
        require(msg.sender != address(0));
        no_of_jobs++;
        bool _statusOpen = true;
        Job_by_No[no_of_jobs] = Job(
            no_of_jobs,
            0,
            0,
            _jobTitle,
            _companyName,
            _workHourPerWeek,
            0,
            _salaryPerHour,
            _statusOpen,
            0,
            msg.sender,
            address(0)
        );
    }

    function createAndSignAgreementFor7Days(
        uint _index,
        string memory _userName
    ) public onlyUser(_index) OnlyWhileStatusOpen(_index) {
        require(msg.sender != address(0));
        no_of_jobAgreements++;
        no_of_users++;

        Job_by_No[_index].currentUser = msg.sender;
        Job_by_No[_index].timestamp = block.timestamp;
        Job_by_No[_index].statusOpen = false;
        Job_by_No[_index].contractDuration = 7 days;
        Job_by_No[_index].agreementId = no_of_jobAgreements;
        Job_by_No[_index].userId = no_of_users;

        JobAgreement_by_No[no_of_jobAgreements] = JobAgreement(
            no_of_jobAgreements,
            _index,
            no_of_users,
            Job_by_No[_index].jobTitle,
            Job_by_No[_index].companyName,
            _userName,
            Job_by_No[_index].workHourPerWeek,
            7 days,
            Job_by_No[_index].salaryPerHour,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );

        User_by_No[no_of_users] = User(
            no_of_users,
            no_of_jobAgreements,
            _index,
            _userName,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );
    }

    function createAndSignAgreementFor30Days(
        uint _index,
        string memory _userName
    ) public onlyUser(_index) OnlyWhileStatusOpen(_index) {
        require(msg.sender != address(0));
        no_of_jobAgreements++;
        no_of_users++;

        Job_by_No[_index].currentUser = msg.sender;
        Job_by_No[_index].timestamp = block.timestamp;
        Job_by_No[_index].statusOpen = false;
        Job_by_No[_index].contractDuration = 30 days;
        Job_by_No[_index].agreementId = no_of_jobAgreements;
        Job_by_No[_index].userId = no_of_users;

        JobAgreement_by_No[no_of_jobAgreements] = JobAgreement(
            no_of_jobAgreements,
            _index,
            no_of_users,
            Job_by_No[_index].jobTitle,
            Job_by_No[_index].companyName,
            _userName,
            Job_by_No[_index].workHourPerWeek,
            30 days,
            Job_by_No[_index].salaryPerHour,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );

        User_by_No[no_of_users] = User(
            no_of_users,
            no_of_jobAgreements,
            _index,
            _userName,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );
    }

    function createAndSignAgreementFor180Days(
        uint _index,
        string memory _userName
    ) public onlyUser(_index) OnlyWhileStatusOpen(_index) {
        require(msg.sender != address(0));
        no_of_jobAgreements++;
        no_of_users++;

        Job_by_No[_index].currentUser = msg.sender;
        Job_by_No[_index].timestamp = block.timestamp;
        Job_by_No[_index].statusOpen = false;
        Job_by_No[_index].contractDuration = 180 days;
        Job_by_No[_index].agreementId = no_of_jobAgreements;
        Job_by_No[_index].userId = no_of_users;

        JobAgreement_by_No[no_of_jobAgreements] = JobAgreement(
            no_of_jobAgreements,
            _index,
            no_of_users,
            Job_by_No[_index].jobTitle,
            Job_by_No[_index].companyName,
            _userName,
            Job_by_No[_index].workHourPerWeek,
            180 days,
            Job_by_No[_index].salaryPerHour,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );

        User_by_No[no_of_users] = User(
            no_of_users,
            no_of_jobAgreements,
            _index,
            _userName,
            block.timestamp,
            Job_by_No[_index].employer,
            msg.sender
        );
    }

    function agreementCompleted(
        uint _index
    ) public onlyEmployer(_index) AgreementTimesUp(_index) {
        require(msg.sender != address(0));
        require(
            Job_by_No[_index].statusOpen == false,
            "Job is currently Closed."
        );
        Job_by_No[_index].statusOpen = true;
    }

    function agreementTerminated(
        uint _index
    ) public onlyEmployer(_index) AgreementTimesLeft(_index) {
        require(msg.sender != address(0));
        Job_by_No[_index].statusOpen = true;
    }
}
