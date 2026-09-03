'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { postForm } from '@/lib/api'
import type { Locale } from '@/i18n/routing'
import { loc } from './loc'

const GENDER = {
  uz: ['Jinsni tanlang', 'Erkak', 'Ayol', 'Boshqa'],
  ru: ['Выберите пол', 'Мужской', 'Женский', 'Другое'],
  en: ['Select gender', 'Male', 'Female', 'Other'],
} as const

const BOARD1 = ['Tanlang', 'ACCSC', 'ACCET', 'DEAC'] as const
const BOARD2 = ['Tanlang', 'NWCCU', 'NECHE', 'MSCHE'] as const

function reqStar() {
  return <span className="grants-req">*</span>
}

export function GrantForm() {
  const locale = useLocale() as Locale
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')
  const [fileName, setFileName] = useState('')

  const L = {
    first: loc(locale, 'Ism', 'Имя', 'First name'),
    last: loc(locale, 'Familiya', 'Фамилия', 'Last name'),
    email: loc(locale, 'Elektron pochta', 'Электронная почта', 'Email'),
    phone: loc(locale, 'Telefon', 'Телефон', 'Phone'),
    birth: loc(locale, 'Tug‘ilgan sana', 'Дата рождения', 'Date of birth'),
    gender: loc(locale, 'Jins', 'Пол', 'Gender'),
    country: loc(locale, 'Mamlakat', 'Страна', 'Country'),
    school: loc(locale, 'O‘rta ta’lim', 'Среднее образование', 'Secondary education'),
    gpa: 'GPA',
    board: loc(locale, 'Ta’lim kengashi', 'Образовательный совет', 'Education board'),
    higher: loc(locale, 'Oliy ta’lim', 'Высшее образование', 'Higher education'),
    cgpa: 'GPA / CGPA',
    income: loc(locale, 'Oila daromadi', 'Доход семьи', 'Family income'),
    need: loc(locale, 'Ehtiyoj asosidagi yordam', 'Нужда в помощи', 'Need-based aid'),
    file: loc(locale, 'Fayl yuklash', 'Загрузить файл', 'Upload file'),
    send: loc(locale, 'Yuborish', 'Отправить', 'Submit'),
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') || '').trim()
    const lastName = String(fd.get('lastName') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const name = [firstName, lastName].filter(Boolean).join(' ')
    if (!name || !email) {
      setErr(loc(locale, 'Majburiy maydonlar', 'Обязательные поля', 'Required fields'))
      return
    }
    setBusy(true)
    setErr('')
    setOk('')
    try {
      await postForm('/api/forms/grant', {
        name,
        firstName,
        lastName,
        email,
        phone: String(fd.get('phone') || ''),
        program: loc(locale, 'Grant arizasi', 'Заявка на грант', 'Grant application'),
        lang: locale,
        page: 'grants',
        birthDate: String(fd.get('birthDate') || ''),
        gender: String(fd.get('gender') || ''),
        country: String(fd.get('country') || ''),
        secondarySchool: String(fd.get('secondarySchool') || ''),
        gpa: String(fd.get('gpa') || ''),
        educationBoard: String(fd.get('educationBoard') || ''),
        higherEducation: String(fd.get('higherEducation') || ''),
        cgpa: String(fd.get('cgpa') || ''),
        higherBoard: String(fd.get('higherBoard') || ''),
        familyIncome: String(fd.get('familyIncome') || ''),
        needAid: String(fd.get('needAid') || ''),
        fileName,
      })
      form.reset()
      setFileName('')
      setOk(loc(locale, 'Ariza yuborildi', 'Заявка отправлена', 'Application sent'))
    } catch {
      setErr(loc(locale, 'Xato', 'Ошибка', 'Failed'))
    } finally {
      setBusy(false)
    }
  }

  const genderOpts = locale === 'ru' ? GENDER.ru : locale === 'en' ? GENDER.en : GENDER.uz

  return (
    <form className="grants-form" onSubmit={onSubmit}>
      <div className="grants-form-note">
        <strong>{loc(locale, 'Grantlar', 'Гранты', 'Grants')}</strong>
        <p>
          {loc(
            locale,
            'Stipendiya va xalqaro dasturlar uchun arizalar admin panel orqali ko‘rib chiqiladi.',
            'Заявки на стипендии и международные программы рассматриваются в админ-панели.',
            'Scholarship and international programme applications are reviewed in the admin panel.',
          )}
        </p>
      </div>

      <h3>{loc(locale, 'Shaxsiy ma’lumotlar', 'Личные данные', 'Personal information')}</h3>
      <div className="grants-form-grid">
        <label>
          {L.first}
          {reqStar()}
          <input name="firstName" required placeholder={L.first} />
        </label>
        <label>
          {L.last}
          {reqStar()}
          <input name="lastName" required placeholder={L.last} />
        </label>
        <label>
          {L.email}
          {reqStar()}
          <input name="email" type="email" required placeholder={L.email} />
        </label>
        <label>
          {L.phone}
          {reqStar()}
          <input name="phone" required placeholder={loc(locale, 'Telefon raqami', 'Номер телефона', 'Phone number')} />
        </label>
        <label>
          {L.birth}
          {reqStar()}
          <input name="birthDate" required placeholder="dd/mm/yy" />
        </label>
        <label>
          {L.gender}
          {reqStar()}
          <select name="gender" required defaultValue="">
            {genderOpts.map((o, i) => (
              <option key={o} value={i === 0 ? '' : o} disabled={i === 0}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="grants-form-span">
          {L.country}
          {reqStar()}
          <input name="country" required placeholder={L.country} />
        </label>
      </div>

      <h3>{loc(locale, 'Ta’lim ma’lumotlari', 'Образование', 'Education')}</h3>
      <div className="grants-form-grid">
        <label>
          {L.school}
          {reqStar()}
          <input name="secondarySchool" required placeholder={loc(locale, 'Maktab / kollej nomi', 'Школа / колледж', 'School / college')} />
        </label>
        <label>
          {L.gpa}
          {reqStar()}
          <input name="gpa" required placeholder="GPA" />
        </label>
        <label className="grants-form-span">
          {L.board}
          {reqStar()}
          <select name="educationBoard" required defaultValue="">
            {BOARD1.map((o, i) => (
              <option key={o} value={i === 0 ? '' : o} disabled={i === 0}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label>
          {L.higher}
          {reqStar()}
          <input name="higherEducation" required placeholder={loc(locale, 'Oliy o‘quv yurti', 'Вуз', 'University')} />
        </label>
        <label>
          {L.cgpa}
          {reqStar()}
          <input name="cgpa" required placeholder="GPA / CGPA" />
        </label>
        <label className="grants-form-span">
          {L.board}
          {reqStar()}
          <select name="higherBoard" required defaultValue="">
            {BOARD2.map((o, i) => (
              <option key={o} value={i === 0 ? '' : o} disabled={i === 0}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h3>{loc(locale, 'Moliyaviy ma’lumotlar', 'Финансовые данные', 'Financial information')}</h3>
      <div className="grants-form-grid">
        <label>
          {L.income}
          {reqStar()}
          <select name="familyIncome" required defaultValue="">
            <option value="" disabled>
              {L.income}
            </option>
            <option value="under-7k">{loc(locale, '7 ming $ dan kam', 'Менее 7 тыс. $', 'Under $7,000')}</option>
            <option value="under-9k">{loc(locale, '9 ming $ dan kam', 'Менее 9 тыс. $', 'Under $9,000')}</option>
          </select>
        </label>
        <label>
          {L.need}
          {reqStar()}
          <select name="needAid" required defaultValue="">
            <option value="" disabled>
              {loc(locale, 'Moliyaviy yordam', 'Финансовая помощь', 'Financial aid')}
            </option>
            <option value="yes">{loc(locale, 'Ha', 'Да', 'Yes')}</option>
            <option value="no">{loc(locale, 'Yo‘q', 'Нет', 'No')}</option>
          </select>
        </label>
      </div>

      <h3>{loc(locale, 'Qo‘shimcha va yuborish', 'Дополнительно и отправка', 'Additional and submit')}</h3>
      <label className="grants-form-file">
        {L.file}
        <span className="grants-form-file-hint">
          {' '}
          ({loc(locale, 'ixtiyoriy — faqat fayl nomi saqlanadi', 'необязательно — сохраняется только имя файла', 'optional — only the file name is stored')})
        </span>
        <input
          name="file"
          type="file"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
        />
      </label>

      <button type="submit" className="grants-form-submit" disabled={busy}>
        {busy ? '…' : L.send}
      </button>
      {ok ? <p className="grants-form-ok">{ok}</p> : null}
      {err ? <p className="grants-form-err">{err}</p> : null}
    </form>
  )
}
