/** @param {import('knex').Knex} knex */
exports.up = async function up(knex) {
    await knex.schema.createTable('tests', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  /** @param {import('knex').Knex} knex */
  exports.down = async function down(knex) {
    await knex.schema.dropTableIfExists('tests');
  };
  