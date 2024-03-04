import { Injectable } from '@nestjs/common';
const db = require("../db");

@Injectable()
export class AssetService {

    create(moviesRaw: any) {
        const movies = [];
        const items = moviesRaw.toString().split("\n");

        items.map(item => {
            const registro = item.split(";");
            if (registro[0] === "year") {
                return;
            }
            const movie = {
                year: +registro[0],
                title: registro[1],
                studios: registro[2],
                producers: registro[3],
                winner: registro[4],
            }
            movies.push(movie);
        });

        // limpeza
        db.serialize(function () {
            db.run(
                `DELETE FROM movie`,
                function (error) {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log(`Deleted!`);
                }
            );
        });

        // novos dados da base
        movies.map(movie => {
            if (movie.year !== 0) {
                db.serialize(() => {
                    db.run(
                        `INSERT INTO movie VALUES (?, ?, ?, ?, ?, ?)`,
                        [null, movie.year, movie.title, movie.studios, movie.producers, movie.winner],
                        function (error) {
                            if (error) {
                                return console.log(error.message);
                            }
                            console.log(`Inserted movie with the id: ${this.lastID}`);
                        }
                    );
                });
                console.log(movie);
            }
        });

    }
}
