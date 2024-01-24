const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const { Artist, sequelize } = require('../../database');

module.exports = function (router) {
  /**
   * upload an image
   */

  // router.post('/upload/:id', upload.single('image'), async function (req, res) {
  //   const artist = await Artist.findByPk(req.params.id);
  //   console.log(req);
  //   const updatedArtist = await Artist.update(
  //     {
  //       data: req.file.buffer,
  //     },
  //     {
  //       where: { id: artist.id },
  //     }
  //   );

  //   res.json(artist);
  // });

  /**
   * List artists
   */
  router.get('/artists', async function (req, res) {
    const artists = await Artist.findAll();

    res.json(artists);
  });

  /**
   * Find an artist by ID
   */
  router.get('/artists/:id', async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);

    res.json(artist);
  });

  /**
   * Create a new artist
   */
  router.put('/artists', async function (req, res) {
    const newArtist = await Artist.create({
      name: req.body.name,
      description: req.body.description,
      label: req.body.label,
    });
    const newArtistResponse = await Artist.findByPk(newArtist.id);
    res.json(newArtistResponse);
  });

  /**
   * Update an artist
   */
  router.post('/artists/:id', async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);

    const updatedArtist = await Artist.update(
      {
        name: req.body.name,
        description: req.body.description,
        label: req.body.label,
      },
      {
        where: { id: artist.id },
      }
    );
    res.json(artist);
  });

  /**
   * Delete an artist
   */
  router.delete('/artists/:id', async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);
    const deletedArtist = await artist.destroy({
      where: {
        id: artist.id,
      },
    });
    res.json(artist);
  });
};
