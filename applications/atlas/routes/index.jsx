import atlas_paths	from 'atlas_paths'

/////////////////////////

export default function(app, express){
  app.use(express.static( atlas_paths._DOC_ROOT ));
}