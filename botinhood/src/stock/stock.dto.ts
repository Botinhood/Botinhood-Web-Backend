/* 
 * Author: Alexander Berryhill
 * 
 * This code defines a simple Data Transfer Object (DTO) 
 * class for working with stock-related data in the application. 
 * It has two properties:
 * 
 * stock: A string property that represents a single stock.
 * stocks: An array of strings that represents multiple stocks.
 * 
 * This DTO class can be used to transfer stock data between different 
 * parts of the application, such as between the client and server, or 
 * between different services or controllers in the server-side code. 
 * By using a DTO, we can define a clear and consistent way of working 
 * with stock data, and ensure that it is correctly validated and processed 
 * before it is used in the application.
 */

export class StockDto {
  stock: string;      // Defines a string property called stock
  stocks: string[];   // Defines an array of strings called stocks
}
