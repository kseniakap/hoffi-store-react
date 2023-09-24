import React, { useContext, useRef, useEffect } from 'react'
import { CustomContext } from '../../Context'
import Order from '../order/Order'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import { Link } from 'react-router-dom'
import './../../style/style.scss'
import st from './OrderList.module.scss'

const OrderList = (
  {
    // order,
    // setOrder,
    // deleteOrder,
    // numberOfOrder
  },
) => {
  const { cardOpen, setCardOpen, isAddToCartClicked, cart } = useContext(
    CustomContext,
  )
  const orderRef = useRef(null)

  const styles = {
    fadeIn: {
      animation: 'x 2s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isAddToCartClicked &&
        cardOpen &&
        orderRef.current &&
        !orderRef.current.contains(event.target)
      ) {
        setCardOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cardOpen])

  const showOrders = (order) => {
    let sum = 0
    order.forEach((el) => (sum += Number(el.price) * el.count))
    return (
      <div className={st.shop__list}>
        {order &&
          order.map((el) => (
            <Order
              // order={order}
              // setOrder={setOrder}
              key={el.id}
              item={el}
              // deleteOrder={deleteOrder}
              // numberOfOrder={numberOfOrder}
            />
          ))}
        <div className={st.sum}>
          <span>Доставка:</span>
          <p className={st.delivery}>Бесплатно при заказе от 50 000 ₽</p>
          <div className={st.result}>
            <span> Итого:</span>
            <span style={{ color: sum > 50000 ? 'green' : 'black' }}>
              {sum.toString().slice(0, -3) + ' ' + sum.toString().slice(-3)} ₽
            </span>
          </div>
          <Link to="/order" className={st.orderLink}>
            Оформить заказ
          </Link>
        </div>
      </div>
    )
  }

  const showNothing = () => {
    return (
      <div>
        <h2 className={st.basket}>Корзина пуста</h2>
        <p className={st.text}>
          Купите комплекст из{' '}
          <Link to="/onegood/43">журнального стола Бруклин</Link> и стула
          <Link to="/onegood/32"> Белен</Link> в сентябре, и вы получите в
          подарок
          <Link to="/onegood/29"> каркас кровати Бланка</Link>
        </p>
      </div>
    )
  }

  return (
    <StyleRoot>
      {cardOpen && (
        <div ref={orderRef} className={st.shop} style={styles.fadeIn}>
          <h2 className={st.title}>Ваша корзина</h2>
          {/* {cart.length > 0 ? showOrders(cart) : showNothing()} */}
          <Link to="/order" className={st.orderLink}>
            Оформить заказ
          </Link>
        </div>
      )}
    </StyleRoot>
  )
}

export default OrderList
