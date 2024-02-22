import { Injectable } from '@nestjs/common';
const db = require("../db");

@Injectable()
export class MoviesService {

    async db_query(query): Promise<any[]> {
        return new Promise(function (resolve, reject) {
            db.all(query, function (err, rows) {
                if (err) { return reject(err); }
                resolve(rows);
            });
        });
    }


    async moviesByProducer(producer: string) {
        let sql = `select * from movie m where winner = 'yes' and m.producers LIKE '%${producer}%' order by year`
        const rows = await this.db_query(sql);
        return rows;
    }

    async getIntervals(allProducers: string[]) {
        let maiorIntervalo = {
            producer: "DEFAULT",
            interval: 0,
            previousWin: 0,
            followinWin: 0,
        };
        let menorIntervalo = {
            producer: "DEFAULT",
            interval: 100,
            previousWin: 0,
            followinWin: 0,
        };

        for (let producer of allProducers) {
            // console.log(allProducers);
            // console.log(`--> producer: ${producer}`)
            // console.log(producer)
            const moviesByProducer = await this.moviesByProducer(producer);
            const totalDeFilmes = moviesByProducer.length;
            // console.log(`${producer}: ${totalDeFilmes}`);   
            // console.log(`totalDeFilmes < 2: ${totalDeFilmes} < 2`);
            if (!(totalDeFilmes < 2)) {
                const intervalo = moviesByProducer[totalDeFilmes - 1].year - moviesByProducer[totalDeFilmes - 2].year;

                if (intervalo > maiorIntervalo.interval) {
                    // console.log("intervalo > maiorIntervalo.interval");
                    // console.log(`${intervalo} > ${maiorIntervalo.interval}`);
                    maiorIntervalo = {
                        producer: producer,
                        interval: intervalo,
                        previousWin: moviesByProducer[totalDeFilmes - 2].year,
                        followinWin: moviesByProducer[totalDeFilmes - 1].year,
                    }
                }

                if (intervalo < menorIntervalo.interval) {
                    // console.log("intervalo < menorIntervalo.interval");
                    // console.log(`${intervalo} < ${menorIntervalo.interval}`);
                    menorIntervalo = {
                        producer: producer,
                        interval: intervalo,
                        previousWin: moviesByProducer[totalDeFilmes - 2].year,
                        followinWin: moviesByProducer[totalDeFilmes - 1].year,
                    }
                }

            }
        };

        console.log("Novos intervalos: ");
        console.log(maiorIntervalo);
        console.log(menorIntervalo);
        
        const resultado = {
            min: [
                menorIntervalo,
            ],
            max: [
                maiorIntervalo
            ]
        }
        
        return resultado;

    }

    async winnersWorstMovie() {
        let sql1 = "SELECT * FROM movie WHERE winner = 'yes' ORDER BY producers";
        const rows = await this.db_query(sql1);
        return rows;
    }
}
