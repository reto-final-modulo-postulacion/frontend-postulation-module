import { environment } from '../../environments/environment';
export class PathRest {
    static readonly getApiPostulant = environment.HostBackent + 'postulant';
    static readonly getApiChallenge = environment.HostBackent + 'challenge';
    static readonly getApiTraining = environment.HostBackent + 'trainingleague';
}
