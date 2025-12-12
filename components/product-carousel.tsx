"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Cupid Gift Basket",
    price: "$15.00",
    image: "/cupid-gift-basket.png",
    description:
      "This Valentine’s, make someone’s day unforgettable with a personalized Cupid’s Basket! Perfect for your girlfriend, best friend, or secret crush, these baskets are crafted with love and designed just for you.",
  },
  {
    id: 2,
    name: "Diwali Gift Basket",
    price: "$30.00",
    image: "/diwali-gift-basket.png",
    description:
      "Celebrate Diwali stress-free with everything you need in one convenient, affordable basket. Priced at just $40, the Shubh Diwali Gift Basket is designed to help you make this Diwali extra special without breaking the bank or spending hours shopping.",
  },
  {
    id: 3,
    name: "Winter Wish Gift Basket",
    price: "$39.99",
    image: "/winter-wish-basket.png",
    description:
      "Get ready to spread some holiday cheer with Simply Gifted’s exclusive Christmas basket line! 🎄✨ Perfect for friends, family, or corporate gifts, our baskets are filled with handpicked, festive goodies that bring warmth and joy to any celebration.",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const getVisibleCards = () => {
    const cards = []
    const totalCards = products.length

    for (let i = 0; i < totalCards; i++) {
      const position = (i - currentIndex + totalCards) % totalCards
      cards.push({
        ...products[i],
        position,
        index: i,
      })
    }

    return cards
  }

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide()
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [currentIndex, isPaused])

  return (
    <div
      className="relative max-w-6xl mx-auto px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-96 flex items-center justify-center" style={{ perspective: "1000px" }}>
        {getVisibleCards().map((card) => {
          const { position, index } = card

          let transform = ""
          let zIndex = 0
          let opacity = 0.4
          let scale = 0.8

          if (position === 0) {
            transform = "translateX(0) translateZ(0) rotateY(0deg)"
            zIndex = 10
            opacity = 1
            scale = 1
          } else if (position === 1 || position === products.length - 1) {
            const isRight = position === 1
            transform = `translateX(${isRight ? "280px" : "-280px"}) translateZ(-200px) rotateY(${isRight ? "-25deg" : "25deg"}`
            zIndex = 5
            opacity = 0.6
            scale = 0.85
          } else {
            const isRight = position < products.length / 2
            transform = `translateX(${isRight ? "400px" : "-400px"}) translateZ(-400px) rotateY(${isRight ? "-45deg" : "45deg"})`
            zIndex = 1
            opacity = 0.2
            scale = 0.7
          }

          return (
            <div
              key={index}
              className="absolute w-80 h-80 transition-all duration-700 ease-in-out cursor-pointer"
              style={{
                transform,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <div
                className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-accent transition-all duration-300"
                style={{ transform: `scale(${scale})` }}
              >
                <div className="h-3/4 overflow-hidden">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="h-1/4 p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-foreground text-center">{card.name}</h3>
                  <p className="text-accent font-semibold text-center mt-1">{card.price}</p>
                </div>
              </div>
            </div>
          )
        })}

        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl h-12 w-12 border-0 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </Button>

        <Button className="h-6 w-6 text-foreground"
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl h-12 w-12 border-0 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </Button>
      </div>

      <div className="flex justify-center mt-8 space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-accent shadow-lg scale-125"
                : "bg-muted hover:bg-muted-foreground/50 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
