import { Argon2id } from 'oslo/password'
import { generateId } from 'lucia'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await addAdminUser()
  await addBlocks()
  await addPages()
  await addConfigs()
}

async function addAdminUser() {
  await prisma.user.upsert({
    where: { username: 'alvasori' },
    update: {},
    create: {
      id: generateId(15),
      username: 'alvasori',
      name: 'AlvaSori Admin',
      email: 'alvasori@alvasori.net',
      password: await new Argon2id().hash('12345678'),
    },
  })
}

async function addBlocks() {
  await prisma.block.upsert({
    where: { name: 'first-block' },
    update: {},
    create: {
      name: 'first-block',
      description: 'My first block.',
      content: `## Hello Friends!!!
---

- Preparation
- Passion
- Oportunity`,
    },
  })

  await prisma.block.upsert({
    where: { name: 'block-test' },
    update: {},
    create: {
      name: 'block-test',
      description: 'Test sub Blocks',
      content: `Test

:a-block{name="first-block" .border-thin .pa-0}

:vBtn{text="Hello" variant="tonal" prepend-icon="mdi-star" color="primary" .my-2}

---

Hello Everybody!

| First Name | LastName | Role | Age |
| ---------- | -------- | ---- | --- |
| Carlos     | Alvarez  | Dad  | 33  |
| Sahudy     | Sharolyn | Mom  | 34  |
| Adrian     | Alvarez  | Son  | 5   |

> To be or not to be, that's the question...

\`\`\`js [file.js]{3} meta-info=val
  export default () => {
    console.log('Code block')
  }
\`\`\`

Just run \`bin/magento setup:upgrade\` in the console to compile _Magento_.

- [x] Hello
`,
    },
  })
}

async function addPages() {
  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      slug: 'about',
      description: 'My first page.',
      content: `---
title: Custom About Us
subtitle: This came from the database!
---

## Welcome to my custom About

---

:vBtn{text="Hello" variant="tonal"}`,
    },
  })
}

async function addConfigs() {
  await prisma.config.upsert({
    where: { path: 'app-name' },
    update: {},
    create: {
      path: 'app-name',
      value: '[A]{.text-red}lva[S]{.text-red}ori',
      description: 'Name showed throughout the App.',
      component: 'MarkdownEditor',
      type: 'string',
    },
  })

  await prisma.config.upsert({
    where: { path: 'contact-form-recipients' },
    update: {},
    create: {
      path: 'contact-form-recipients',
      value: '',
      component: 'AEmails',
      description: 'Emails to send the contact requests to.',
    },
  })

  await prisma.config.upsert({
    where: { path: 'social-networks' },
    update: {},
    create: {
      path: 'social-networks',
      type: 'json',
      value: JSON.stringify([
        {
          icon: 'mdi-facebook',
          link: 'https://www.facebook.com/alvasori',
        },
        {
          icon: 'mdi-linkedin',
          link: 'https://www.linkedin.com/alvasori',
        },
        {
          icon: 'mdi-instagram',
          link: 'https://www.instagram.com/alvasori',
        },
      ]),
      component: 'ConfigSocialNetworks',
      description: 'Social Networks',
    },
  })

  await prisma.config.upsert({
    where: { path: 'navigation-links' },
    update: {},
    create: {
      path: 'navigation-links',
      type: 'json',
      value: JSON.stringify([
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'About Us',
          link: '/about',
        },
        {
          label: 'Contact Us',
          link: '/contactus',
        },
      ]),
      component: 'ConfigNavigationLinks',
      description: 'Navigation Links',
    },
  })
}

await main()
