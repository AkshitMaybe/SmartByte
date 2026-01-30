import { CourseCard } from '@/components/CourseCard';
import { courses } from '@/data/courses';

const CoursesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {courses.map((course, index) => (
        <CourseCard key={course.slug} course={course} index={index} />
      ))}
    </div>
  );
};

export default CoursesGrid;
