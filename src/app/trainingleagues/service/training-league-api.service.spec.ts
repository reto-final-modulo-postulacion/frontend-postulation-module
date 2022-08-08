import { TestBed } from "@angular/core/testing";

import { TrainingLeagueApiService } from "./training-league-api.service";

describe("TrainingLeagueApiService", () => {
	let service: TrainingLeagueApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TrainingLeagueApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
