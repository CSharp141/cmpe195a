import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        username: column.text(),
        password: column.text(),
    }
})

const Comment = defineTable({
    columns: {
      // A string of text.
      author: column.text(),
      // A whole integer value.
      likes: column.number(),
      // A true or false value.
      flagged: column.boolean(),
      // Date/time values queried as JavaScript Date objects.
      published: column.date(),
      // An untyped JSON object.
      metadata: column.json(),
    }
  });
  

export default defineDb({
    tables: { User },
})

