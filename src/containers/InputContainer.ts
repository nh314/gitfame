import { connect } from "react-redux";
import Input from "../components/Input";
import { InputState, InputActionTypes, InputProps } from "../store/Input/types";
import * as InputActions from "../store/Input/actions";
import { bindActionCreators } from "redux";

const mapStateToProps = (state: InputState) => ({
  term: state.term,
  isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    intputActions: bindActionCreators(InputActions, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
