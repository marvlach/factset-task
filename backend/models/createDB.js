import { parse } from 'csv-parse';
import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const createDB = async (sequelize) => {
    
    /* await sequelize.query("CREATE DATABASE IF NOT EXISTS `FSDB`;");
    await sequelize.query("USE `FSDB`;"); */


    /*  // read initial values from .csv
    We represent the exchange rates as weighted edges 
    and the different currencies as vertices of a directed graph
    ex. 
    (Euro)  ----1.3764 ----> (USDollar) 
            <---1/1.3764 --- 
    That way some exchange rates can be infered, 
    even if they are not present in the .csv file.
    To infer a rate(A to B), in the case of a non-existent direct edge(A -> B),
    we do DFS traversal and multiply the weights of every edge we visit.
    The problem of whether all ratios can be infered reduces to a graph coverage problem.
    
    const uniqueCurrencies = [];
    const csvPath = path.join(__dirname, 'initialData.csv');
    fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data",  row =>  {
            if (!uniqueCurrencies.includes(row[0])) {
                uniqueCurrencies.push(row[0])
            }

            if (!uniqueCurrencies.includes(row[1])) {
                uniqueCurrencies.push(row[1])
            }
            console.log(row);
        })
        .on("error", error => {
            console.log(error.message);
        })
        .on("end", () => {
            console.log("finished");
            console.log(uniqueCurrencies);
        });

    console.log(uniqueCurrencies);
    */
}
