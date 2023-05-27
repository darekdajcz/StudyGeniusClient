export interface TutorStat {
  subject: string;
  price: string;
  createDate: string;
}

export interface TutorStatistic {
  tutorStats: TutorStat[];
}