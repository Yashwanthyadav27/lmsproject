import Link from 'next/link';
import { BookOpen, Lock, CheckCircle, PlayCircle } from 'lucide-react';

interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  _count: {
    sections: number;
  };
}

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/subjects/${subject.id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          {subject.thumbnail ? (
            <img
              src={subject.thumbnail}
              alt={subject.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-white opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
            {subject.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {subject.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen className="w-4 h-4 mr-2" />
              {subject._count.sections} Sections
            </div>
            <div className="text-pink-600 font-semibold text-sm group-hover:underline">
              View Course →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
