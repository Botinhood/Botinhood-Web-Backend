/*
 * Author: Alexander Berryhill
 * 
 * This is an interface named Stock. It defines the shape 
 * of an object that contains a stock property of type 
 * string and a stocks property which is an array of string 
 * type. This interface can be used as a type in other parts 
 * of the code to ensure that the properties of an object 
 * match the expected shape defined by this interface.
 */

export interface Stock {
    stock: string;
    stocks: string[];
}