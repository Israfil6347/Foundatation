import PublicTemplateLayout from '@/Layouts/PublicTemplateLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

function Committee({auth}) {
  return (
    <div>
      <PublicTemplateLayout auth={auth}>
        <Head title="Committee" />
         Committee
      </PublicTemplateLayout>
     
    </div>
  )
}

export default Committee
