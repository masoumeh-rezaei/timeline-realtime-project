'use client'

import React from 'react'
import { Trade } from '@/type/types'
import { MiniLineChart } from './MiniLineChart'

type Props = {
    symbol: string
    history: Trade[]
    latestPrice?: number
    change?: number
}

export const PriceCard: React.FC<Props> = ({ symbol, history, latestPrice, change }) => {
    const isUp = typeof change === 'number' && change >= 0

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-4 hover:shadow-2xl transition duration-300">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">{symbol.toUpperCase()}</h2>
                <div
                    className={`font-semibold ${
                        typeof change === 'number'
                            ? isUp
                                ? 'text-green-500'
                                : 'text-red-500'
                            : 'text-gray-700'
                    }`}
                >
                    {typeof latestPrice === 'number' ? latestPrice.toFixed(2) : '--'}{' '}
                    {typeof change === 'number' ? `(${change.toFixed(2)}%)` : ''}
                </div>
            </div>

            <MiniLineChart
                history={history}
                color={isUp ? '#10b981' : '#ef4444'}
            />
        </div>
    )
}
