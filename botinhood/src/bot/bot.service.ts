// Import necessary modules
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MeanReversionService } from '../mean-reversion/mean-reversion.service';
import { LongShortService } from 'src/long-short/long-short.service';
import { ConfigService } from '@nestjs/config';
import { BotType } from './bot.types';
import { EnvironmentalVariables } from 'src/utils/constants';

// Define the BotService class as an injectable service and implement OnModuleInit
@Injectable()
export class BotService implements OnModuleInit {
  // Define a logger to log messages
  private readonly logger = new Logger(BotService.name);

  // Define a MeanReversionService instance using the configService and EnvironmentalVariables
  private readonly meanReversion = new MeanReversionService({
    keyId: this.configService.get<EnvironmentalVariables>(EnvironmentalVariables.ALPACA_API_KEY),
    secretKey: this.configService.get<EnvironmentalVariables>(EnvironmentalVariables.ALPACA_SECRET_KEY),
    paper: true,
  });

  // Define a LongShortService instance using the configService and EnvironmentalVariables
  private readonly longShort = new LongShortService({
    keyId: this.configService.get<EnvironmentalVariables>(EnvironmentalVariables.ALPACA_API_KEY),
    secretKey: this.configService.get<EnvironmentalVariables>(EnvironmentalVariables.ALPACA_SECRET_KEY),
    paper: true,
  });

  // Constructor that takes in a ConfigService instance and sets it as a class property
  constructor(private configService: ConfigService) {}

  // Implement OnModuleInit's onModuleInit method to initialize the bot
  onModuleInit(): void {
    // Log a message indicating that the bot is initializing
    this.logger.log(`Initializing ${BotService.name}`);

    // Call the run method
    this.run();
  }

  // Define an asynchronous run method that initializes the bot based on the botType
  async run(): Promise<void> {
    // Get the botType from the configService
    const botType: BotType = this.configService.get<BotType>(EnvironmentalVariables.BOT_TYPE);

    // If the botType is LONG_SHORT, initialize the long-short algorithm
    if (botType === BotType.LONG_SHORT) {
      this.logger.log('Initializing Long Short algorithm');
      await this.longShort.run();
    } 
    // If the botType is MEAN_REVERSION, initialize the mean-reversion algorithm
    else if (botType === BotType.MEAN_REVERSION) {
      this.logger.log('Initializing Mean Reversion algorithm');
      await this.meanReversion.run();
    } 
    // If the botType is neither LONG_SHORT nor MEAN_REVERSION, log an error message
    else {
      this.logger.error('Please include a valid BOT_TYPE env variable', BotService.name);
    }
  }
}
