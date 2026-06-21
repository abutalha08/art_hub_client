import React from 'react';
import { Card, CardBody } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
    return (
        <Card
            className={`bg-[#111119] border border-white/[0.05] rounded-2xl shadow-xl transition-all duration-300 hover:border-[#B342F2]/30 group ${className}`}
        >
            <Card.Content className="flex flex-col gap-6 justify-between p-5">
                {/* Icon Wrapper */}
                {Icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#7928CA]/10 to-[#B342F2]/10 border border-[#B342F2]/20 text-[#D946EF] transition-all duration-300 group-hover:scale-110">
                        <Icon size={22} />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide uppercase">
                        {title}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {value}
                    </span>
                </div>
            </Card.Content>
        </Card>
    );
};