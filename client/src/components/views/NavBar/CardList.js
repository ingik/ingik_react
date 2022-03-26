import React, { useEffect, useRef, useState } from 'react'
import './CardList.css'

function CardList() {

    const [Data, setData] = useState([
      { name: "기린", id: 0 },
      { name: "강아지", id: 1 },
      { name: "토끼", id: 2 },
      { name: "호랑이", id: 3 },
      { name: "사자", id: 4 },
    ]);

    const viewport = useRef(null)
    const target = useRef(null)

    const loadItems = () => {
        setData((prevState)=>{
            const animals = [
              { name: "고양이" },
              { name: "코끼리" },
              { name: "원숭이" },
              { name: "고라니" },
              { name: "기린" },
              { name: "표범" },
            ];

            const id = prevState[prevState.length - 1].id
            const animalId = animals.map((animal, index) => {
                return {...animal, id:id + index + 1}
            });

            return [...prevState, ...animalId]
        })
    }

    useEffect(() => {

        const options = {
            root : viewport.current,
            threshold:1,
        }

        const handleintersection = (entries,observer) => {
            console.log(entries)
            entries.forEach((entry) => {
                if(!entry.isIntersecting){
                    return ;
                }

                loadItems();

                observer.unobserve(entry.target)
                observer.observe(target.current)
            })
        }

        const io = new IntersectionObserver(handleintersection,options)

        if(target.current){
            io.observe(target.current)
        }

        //clean up
        return () => io && io.disconnent();

    },[viewport, target])


  return (
    <div className='wrapper'>
        <section className='card-grid' id='target-root' ref={viewport}>
            {Data.map((animal,index) => {
                
                const lastEl = index === Data.length - 1
                console.log(lastEl)
                return (
                    <div
                        key={index}
                        className={`card ${lastEl && "last"}`}
                        ref={lastEl ? target: null}
                    >
                        <p>아이디:{animal.id}</p>
                        <p>이름:{animal.name}</p>
                    </div>
                )
            })}
        </section>
    </div>
  )
}

export default CardList