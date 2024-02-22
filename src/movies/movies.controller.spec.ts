import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService]
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should return intervals', async () => {
    const allWinners = [
      {
        id: 1,
        year: 1980,
        title: "Can't Stop the Music",
        studios: 'Associated Film Distribution',
        producers: 'Allan Carr',
        winner: 'yes'
      },
      {
        id: 86,
        year: 1996,
        title: 'Striptease',
        studios: 'Columbia Pictures, Castle Rock Entertainment',
        producers: 'Andrew Bergman and Mike Lobell',
        winner: 'yes'
      },
      {
        id: 96,
        year: 1998,
        title: 'An Alan Smithee Film: Burn Hollywood Burn',
        studios: 'Hollywood Pictures',
        producers: 'Ben Myron and Joe Eszterhas',
        winner: 'yes'
      }]
      const mockResult = {
        min: [
          {
            producer: 'Joel Silver',
            interval: 1,
            previousWin: 1990,
            followinWin: 1991
          }
        ],
        max: [
          {
            producer: 'Matthew Vaughn',
            interval: 13,
            previousWin: 2002,
            followinWin: 2015
          }
        ]
      }

    moviesService.winnersWorstMovie = jest.fn().mockReturnValueOnce(allWinners);
    moviesService.getIntervals = jest.fn().mockReturnValueOnce(mockResult);

    const callApi = await controller.intervals();

    expect(callApi.max[0].producer).toBe("Matthew Vaughn");
    expect(callApi.max[0].interval).toBe(13);
    expect(callApi.max[0].previousWin).toBe(2002);
    expect(callApi.max[0].followinWin).toBe(2015);

    expect(callApi.min[0].producer).toBe("Joel Silver");
    expect(callApi.min[0].interval).toBe(1);
    expect(callApi.min[0].previousWin).toBe(1990);
    expect(callApi.min[0].followinWin).toBe(1991);
    


  });
});
