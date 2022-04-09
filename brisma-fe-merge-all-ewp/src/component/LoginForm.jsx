import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { Button, Form, Input, Typography } from "antd";
import { getError, getLoading } from "../store/ducks/auth/selectors";
import { login } from "../store/ducks/auth/actions";

export const LoginForm = ({ onSubmit, loading, error }) => {
  let navigate = useNavigate();

  const handleOnSubmit = async ({ pn, password }) => {
    const success = await onSubmit(pn, password)
    if (success) navigate("/dashboard")
  }

  return (
    <Form
      layout="vertical"
      onFinish={handleOnSubmit}
    >
      <h3 className="font-semibold text-2xl py-8">Login</h3>
      <Form.Item
        label="Personal Number"
        name="pn"
      >
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
      >
        <Input.Password disabled={loading} />
      </Form.Item>
      <Form.Item shouldUpdate>
        {({ getFieldsValue }) => {
          const { pn, password } = getFieldsValue(true)
          const isAllFilled = pn && password
          return (
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isAllFilled}
                loading={loading}
              >
                Sign In
              </Button>
              {error && <Typography.Text type="danger">{error}</Typography.Text>}
            </div>
          );
        }}
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
};

LoginForm.defaultProps = {
  onSubmit: ({ pn, password }) => true,
  loading: false
};

const mapStateToProps = state => ({ loading: getLoading(state), error: getError(state) })

const mapDispatchToProps = {
  onSubmit: login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)