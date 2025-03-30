interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: Array<string>;
  kind: "special"
}

export interface PartProps {
  part: CoursePart;
}

export type CoursePart = 
  CoursePartDescription | 
  CoursePartBasic | 
  CoursePartGroup | 
  CoursePartBackground |
  CoursePartSpecial;