import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
    columns: {
        id: column.text({ primaryKey: true, optional: false }),
        username: column.text({ unique: true, optional: false}),
        hashed_password: column.text( { optional: false }),
    }
})

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false }),
    expires_at: column.number({ optional: false }),
    user_id: column.text({ references: () => User.columns.id, optional: false }),
  }
})


export default defineDb({
    tables: { User, Session },
})

