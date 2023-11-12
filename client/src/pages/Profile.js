import SearchForm from "../components/geoComponents/searchForm";

export default function Profile() {
  return (
    <div className="flex column center relative coverPage profileCoverImg">
      <h1 className="homeHeader m25 p75 stroke25">your dashBoard</h1>
      <h4 className="homeHeader m25 stroke25">
        search for a location using the form below
      </h4>
      <SearchForm />
    </div>
  );
}
