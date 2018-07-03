/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `JobController.create()`
   */
  create: async function (req, res) {
    try {
      let { title, description, salary, position } = req.allParams();

      if (!title) {
        return res.badRequest({err: 'title is required'})
      }
  
      if (!salary) {
        return res.badRequest({err: 'salary is required'})
      }
  
      // create a new record in JobDetail
      const jobDetail = await JobDetail.create({
        description, salary, position
      }).fetch();
      // console.log("::::::: jobDetail ", jobDetail)
      // create a new record in Job
      const job = await Job.create({title, jobDetail: jobDetail.id}).fetch()
      return res.ok(job)
    } catch (err) {
      return res.serverError(err)
    }
    
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    return res.json({
      todo: 'find() is not implemented yet!'
    });
  }

};

