import { IView } from 'views';
export interface IProgress extends IView {
    setPercent(percent: number): any;
}
