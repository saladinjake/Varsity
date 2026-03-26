import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';
import { getCourses } from '../services/api';
import { motion } from 'framer-motion';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['courses-featured'],
    queryFn: () => getCourses({ limit: 6 }),
  });

  const courses = data?.courses || [];

  return (
    <div className="flex flex-col gap-24">

      <section className="relative overflow-hidden pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-sm font-black tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Next-Gen Learning
            </div>
            <h1 className="text-7xl font-outfit font-black leading-[0.9] tracking-tighter text-slate-900">
              Unlock Your <span className="text-sky-500">Academic</span> Potential with Varsity.
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Experience a smarter way to learn with AI-powered course recommendations, expert-led cohorts, and industrial-grade certification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn-premium">
                Explore Courses <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-3.5 rounded-full border-2 border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <Play size={20} className="fill-slate-900" /> Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-8 mt-4 pt-8 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">12k+</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">450+</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instructors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">98%</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Success Rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-y-2 border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                alt="Students learning"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl font-outfit font-black tracking-tighter text-slate-900">Elite <span className="text-sky-500">Assets</span></h2>
            <p className="text-slate-500 text-lg font-medium">Hand-picked selections from the world's leading manufacturers of mind.</p>
          </div>
          <Link to="/courses" className="btn-premium group transition-all">
            View All Catalog <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => <div key={i} className="h-[450px] rounded-[2.5rem] bg-slate-100 animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {courses.map((course: any) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={course.id}
              >
                <Link to={`/course/${course.slug}`} className="glass-card flex flex-col h-full hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden rounded-t-[1.4rem]">
                    <img
                      src={course.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur rounded-2xl text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-xl">
                      {course.category_name}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1 gap-6">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-black text-slate-900">4.9</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-2">Highly Rated</span>
                    </div>
                    <h3 className="text-2xl font-outfit font-black leading-tight text-slate-900 uppercase tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm line-clamp-2">
                      {course.subtitle}
                    </p>
                    <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{course.instructor_name?.[0]}</div>
                        <span className="text-[10px] font-black uppercase text-slate-400">{course.instructor_name}</span>
                      </div>
                      <div className="text-2xl font-outfit font-black text-slate-900">
                        {course.price === 0 ? "FREE" : `$${course.price}`}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
