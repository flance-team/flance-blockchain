import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import testingConfig from './config/testing.config';

describe('AppController and AppService', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        AppModule,
        ConfigModule.forRoot({
          load: [testingConfig],
        }),
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('wallets', () => {
    it('should return wallets service', () => {
      appController.createWallet().then((val) => {
        expect(val).toBeDefined();
      });
    });

    it('create wallet should have property mnemonic', () => {
      appService.createWallet().then((val) => {
        expect(val).toBeDefined();
        expect(val).toHaveProperty('mnemonic');
        expect(val).toHaveProperty('walletAddress');
        expect(val).toHaveProperty('depositHash');
      });
    });
  });

  describe('balances', () => {
    it('should return balances service', () => {
      appController
        .balance('0x91B7897C7261e4808E4FbaF1dd84266365A04476')
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('should have property balance', () => {
      appService
        .balance('0x91B7897C7261e4808E4FbaF1dd84266365A04476')
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('balance');
        });
    });
  });

  describe('jobs', () => {
    it('should return create job service', () => {
      appController
        .createJob(
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
          {
            jobTitle: 'test job',
            companyName: 'test company',
            workHourPerWeek: 10,
            salaryPerHour: 10000,
          },
        )
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('create job should have property jobTitle', () => {
      appService
        .createJob(
          {
            jobTitle: 'test job',
            companyName: 'test company',
            workHourPerWeek: 10,
            salaryPerHour: 10000,
          },
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('jobTitle');
          expect(val).toHaveProperty('companyName');
          expect(val).toHaveProperty('workHourPerWeek');
          expect(val).toHaveProperty('salaryPerHour');
          expect(val).toHaveProperty('hash');
          expect(val).toHaveProperty('jobBlockchainId');
        });
    });

    it('should return read job by id service', () => {
      appController
        .readJobById(
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
          '2',
        )
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('read job by id should have property jobTitle', () => {
      appService
        .readJobById(
          '2',
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('jobBlockchainId');
          expect(val).toHaveProperty('agreementId');
          expect(val).toHaveProperty('userId');
          expect(val).toHaveProperty('jobTitle');
          expect(val).toHaveProperty('companyName');
          expect(val).toHaveProperty('workHourPerWeek');
          expect(val).toHaveProperty('contractDuration');
          expect(val).toHaveProperty('salaryPerHour');
          expect(val).toHaveProperty('status');
          expect(val).toHaveProperty('employerSigner');
          expect(val).toHaveProperty('userSigner');
        });
    });
  });

  describe('agreements', () => {
    it('should return create and sign agreement service', () => {
      appController
        .createAndSignAgreement(
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
          {
            jobBlockchainId: 6,
            userName: 'testing user',
            contractDuration: 180,
          },
        )
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('create and sign agreement 7 days should have property agreementBlockchainId', () => {
      appService
        .createAndSignAgreement(
          { jobBlockchainId: 1, userName: 'testing user', contractDuration: 7 },
          '37986f12c7e96143663ead22a70631aa8b1032e923919010c0dd4ae38a076c5d',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('jobBlockchainId');
          expect(val).toHaveProperty('userName');
          expect(val).toHaveProperty('hash');
          expect(val).toHaveProperty('agreementBlockchainId');
          expect(val).toHaveProperty('userBlockchainId');
        });
    });

    it('create and sign agreement 30 days should have property agreementBlockchainId', () => {
      appService
        .createAndSignAgreement(
          {
            jobBlockchainId: 3,
            userName: 'testing user',
            contractDuration: 30,
          },
          '37986f12c7e96143663ead22a70631aa8b1032e923919010c0dd4ae38a076c5d',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('jobBlockchainId');
          expect(val).toHaveProperty('userName');
          expect(val).toHaveProperty('hash');
          expect(val).toHaveProperty('agreementBlockchainId');
          expect(val).toHaveProperty('userBlockchainId');
        });
    });

    it('create and sign agreement 180 days should have property agreementBlockchainId', () => {
      appService
        .createAndSignAgreement(
          {
            jobBlockchainId: 6,
            userName: 'testing user',
            contractDuration: 180,
          },
          '37986f12c7e96143663ead22a70631aa8b1032e923919010c0dd4ae38a076c5d',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('jobBlockchainId');
          expect(val).toHaveProperty('userName');
          expect(val).toHaveProperty('hash');
          expect(val).toHaveProperty('agreementBlockchainId');
          expect(val).toHaveProperty('userBlockchainId');
        });
    });

    it('should return read agreement by id service', () => {
      appController
        .readAgreementById(
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
          '2',
        )
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('read agreement by id should have property agreementId', () => {
      appService
        .readAgreementById(
          '2',
          '37986f12c7e96143663ead22a70631aa8b1032e923919010c0dd4ae38a076c5d',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('agreementBlockchainId');
          expect(val).toHaveProperty('jobId');
          expect(val).toHaveProperty('userId');
          expect(val).toHaveProperty('jobTitle');
          expect(val).toHaveProperty('companyName');
          expect(val).toHaveProperty('userName');
          expect(val).toHaveProperty('workHourPerWeek');
          expect(val).toHaveProperty('contractDuration');
          expect(val).toHaveProperty('salaryPerHour');
          expect(val).toHaveProperty('timestamp');
          expect(val).toHaveProperty('employerSigner');
          expect(val).toHaveProperty('userSigner');
        });
    });

    it('should return read user by id service', () => {
      appController
        .readUserById(
          '6d5683e1c1edf8836c6a8030f71af229604af0f895ed37179b3e0e8c740203ec',
          '2',
        )
        .then((val) => {
          expect(val).toBeDefined();
        });
    });

    it('read user by id should have property userId', () => {
      appService
        .readUserById(
          '2',
          '37986f12c7e96143663ead22a70631aa8b1032e923919010c0dd4ae38a076c5d',
        )
        .then((val) => {
          expect(val).toBeDefined();
          expect(val).toHaveProperty('userBlockchainId');
          expect(val).toHaveProperty('jobId');
          expect(val).toHaveProperty('agreementId');
          expect(val).toHaveProperty('userName');
          expect(val).toHaveProperty('timestamp');
          expect(val).toHaveProperty('employerSigner');
          expect(val).toHaveProperty('userSigner');
        });
    });
  });
});
