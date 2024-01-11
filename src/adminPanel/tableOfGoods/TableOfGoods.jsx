import React, { useContext, useState } from 'react'
import { CustomContext } from '../../Context'
import { useForm } from 'react-hook-form'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import st from './TableOfGoods.module.scss'
import { useTranslation } from 'react-i18next'

const TableOfGoods = () => {
  const { allGoods, formatPrice, searchGoods } = useContext(
    CustomContext,
  )
  const [changeInfo, setChangeInfo] = useState(allGoods.map(() => false))

  const [changeIndex, setChangeIndex] = useState(null)
  const { t } = useTranslation()
  const { register } = useForm()
  const filterArray = allGoods.filter((item) =>
    item.name.toLowerCase().includes(searchGoods.toLowerCase()),
  )

  return (
    <form className={st.table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className={st.tableCell}>Название продукта</TableCell>
              <TableCell className={st.tableCell}>Цена</TableCell>
              <TableCell className={st.tableCell}>Описание</TableCell>
              <TableCell className={st.tableCell}>Категория</TableCell>
              <TableCell className={st.tableCell}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filterArray.length === 0 && (
              <p>Товаров нет по заданному запросу</p>
            )}
            {filterArray.map((good, index) => {
              const {name, description, price, newPrice, colors } = good

              const firstImg = colors && colors[0]?.image
              const path = `${process.env.PUBLIC_URL}/img/${firstImg}`
              let newPath = path
              if (path.startsWith('/img/https://')) {
                newPath = path.substring(5)
              }
              return (
                <TableRow key={good.id}>
                  <TableCell className={st.tableCell} style={{ width: '20%' }}>
                    <div className={st.goodWrapper}>
                      <img
                        src={newPath}
                        alt="фото товара"
                        className={st.image}
                      />
                      {changeIndex === index ? (
                        <>
                          <input
                            {...register('name')}
                            type="text"
                            defaultValue={name}
                          />
                        </>
                      ) : (
                        <p>{name}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={st.tableCell} style={{ width: '12%' }}>
                    <div className={st.price}>
                      {changeIndex === index ? (
                        <div className={st.changePrice}>
                          {newPrice ? (
                            <>
                              <label htmlFor="price">Старая цена:</label>
                              <input defaultValue={price} disabled id="price" />
                            </>
                          ) : null}
                          <label htmlFor="price">Новая цена:</label>
                          <input
                            {...register('newPrice')}
                            type="number"
                            defaultValue={price}
                            placeholder="Введите цену"
                            id="newPrice"
                          />
                        </div>
                      ) : (
                        <>
                          {!newPrice || price === +newPrice ? (
                            <div>
                              {formatPrice(price)} <span> ₽</span>
                            </div>
                          ) : (
                            <>
                              <div style={{ textDecoration: 'line-through' }}>
                                {formatPrice(price)} <span> ₽</span>
                              </div>
                              <span> / </span>
                              <div>
                                {formatPrice(newPrice)} <span> ₽</span>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={st.tableCell} style={{ width: '50%' }}>
                    {changeIndex === index ? (
                      <>
                        <textarea
                          {...register('description')}
                          type="text"
                          defaultValue={description}
                          placeholder="изменить описание"
                          className={st.descr}
                        />
                      </>
                    ) : (
                      <> {description}</>
                    )}
                  </TableCell>
                  <TableCell className={st.tableCell}>
                    {changeIndex === index ? (
                      <div className={st.formSubtitle}>
                        <label>{t('AddNewGood.category')}</label>
                        <select
                          id="category"
                          {...register('category')}
                          defaultValue=""
                          required
                        >
                          <option value="" disabled hidden>
                            {t('AddNewGood.chooseCategory')}
                          </option>
                          <option value="table">
                            {t('goodsPage.categories.twoCategory')}
                          </option>
                          <option value="chair">
                            {t('goodsPage.categories.threeCategory')}
                          </option>
                          <option value="armchair">
                            {t('goodsPage.categories.fourCategory')}
                          </option>
                          <option value="sofa">
                            {t('goodsPage.categories.fiveCategory')}
                          </option>
                          <option value="sofa-bed">
                            {t('goodsPage.categories.sixCategory')}
                          </option>
                          <option value="comod">
                            {t('goodsPage.categories.sevenCategory')}
                          </option>
                          <option value="bed">
                            {t('goodsPage.categories.eightCategory')}
                          </option>
                          <option value="press">
                            {t('goodsPage.categories.nineCategory')}
                          </option>
                          <option value="puff">
                            {t('goodsPage.categories.tenCategory')}
                          </option>
                        </select>
                      </div>
                    ) : (
                      <> {good.category}</>
                    )}
                  </TableCell>
                  <TableCell className={st.tableCell}>
                    <div className={st.btns}>
                      <button onClick={() => setChangeIndex(index)}>
                        Изменить
                      </button>
                      <button type="button">
                        Удалить
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  )
}

export default TableOfGoods
