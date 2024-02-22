import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) { }

    @Get()
    async intervals() {
        const allWinners = await this.moviesService.winnersWorstMovie();
        // console.log(allWinners);
        const allProducers = this.getAllProducers(allWinners, []);
        // console.log(allProducers);
        const resultado = await this.moviesService.getIntervals(allProducers);
        // console.log(resultado);
        return resultado;

    }

    private getAllProducers(allWinners: any[], allProducers: any[]): string[] {
        allWinners.map((movie) => {

            const splittedByAnd = movie.producers.split(" and ");
            const splittedByComma = splittedByAnd[0].split(",");

            const movieProducers: string[] = [];
            splittedByComma.map(nome => { movieProducers.push(nome.trim()); });
            if (splittedByAnd[1]) {
                movieProducers.push(splittedByAnd[1].trim());
            }

            movieProducers.map(producer => {
                if (!allProducers.includes(producer)) {
                    if (producer != "") {
                        allProducers.push(producer);
                    }
                }
            });
        });
        return allProducers;
    }
}
