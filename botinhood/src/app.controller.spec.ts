// Import required modules from NestJS
import { Test, TestingModule } from '@nestjs/testing'

// Import the AppController and AppService to be tested
import { AppController } from './app.controller'
import { AppService } from './app.service'

// Describe a test suite for the AppController
describe('AppController', () => {

  // Define a variable for the AppController instance
  let appController: AppController

  // Use the beforeEach method to set up the AppController instance for each test
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    // Get the instance of the AppController
    appController = app.get<AppController>(AppController)
  })

  // Describe a test case for the root endpoint of the AppController
  describe('root', () => {

    // Test that the root endpoint returns a healthy status
    it('should return healthy status', () => {
      const response = { status: 200, body: 'healthy' }

      // Use Jest's expect function to assert that the getStatus method of AppController returns the expected response
      expect(appController.getStatus()).toStrictEqual(response)
    })
  })
})
