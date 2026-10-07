import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Aryan Sharma",
    role: "12th Science Student",
    text: "Studious helped me identify my weak spots in Physics. The adaptive learning path is a game-changer!",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "JEE Aspirant",
    text: "The dashboard visualization makes it so easy to track my progress across all subjects.",
    rating: 5
  },
  {
    name: "Rahul Verma",
    role: "11th Science Student",
    text: "I love how the system suggests degree options based on my performance. Very helpful for career planning.",
    rating: 4
  },
  {
    name: "Sneha Gupta",
    role: "Board Student",
    text: "Chemistry was always tough for me, but the personalized content made it much simpler to understand.",
    rating: 5
  },
  {
    name: "Aniket Deshmukh",
    role: "NEET Aspirant",
    text: "Best platform for science students. The UI is clean and the content is top-notch.",
    rating: 5
  }
];

export default function ReviewMarquee() {
  return (
    <div className="py-20 bg-slate-50 overflow-hidden border-y border-brand/10">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Students Say</h2>
        <p className="text-slate-600">Join thousands of students excelling with Studious</p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="py-4 animate-marquee whitespace-nowrap flex gap-8">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="inline-block w-[350px] p-6 bg-white rounded-2xl shadow-sm border border-brand/5 hover:border-brand/20 transition-colors"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-brand/20 mb-2" />
              <p className="text-slate-700 whitespace-normal mb-4 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
