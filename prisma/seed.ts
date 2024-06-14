import { PrismaClient } from '@prisma/client'
import { Argon2id } from 'oslo/password'
import { generateId } from 'lucia'

const prisma = new PrismaClient()

async function main() {
  await addAdminUser()
  await addBlocks()
  await addPages()
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

await main()
