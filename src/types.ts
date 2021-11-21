export interface Route {
  id: number
  name: string
}
export interface Project {
  name: string
  description: string
  image: string
  span?: 2 | 3
  position?: string
  refs?: ProjectRef[]
  technologies?: string[]
}
export interface ProjectRef {
  type: string
  link: string
}
